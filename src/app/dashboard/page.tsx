"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import {
  Pill, FileText, Calendar, Package, CreditCard, Settings, Bell, Home,
  User, LogOut, ChevronRight, Clock, CheckCircle2, Truck, Users,
  DollarSign, Activity, ShoppingBag, BarChart3, Shield, Menu, X
} from "lucide-react";
import styles from "./Dashboard.module.css";

type Role = "customer" | "admin";

interface User {
  isLoggedIn: boolean;
  name: string;
  role: "user" | "admin";
}

interface Prescription {
  id: string;
  medication: string;
  status: "active" | "expired";
  refillsLeft: number;
  expiryDate: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: "delivered" | "processing" | "shipped";
  items: number;
}

const mockUser: User = { isLoggedIn: true, name: "John Doe", role: "admin" };

const mockPrescriptions: Prescription[] = [
  { id: "RX-2024-001", medication: "Metformin 500mg", status: "active", refillsLeft: 3, expiryDate: "2025-06-15" },
  { id: "RX-2024-002", medication: "Lisinopril 10mg", status: "active", refillsLeft: 1, expiryDate: "2025-04-20" },
];

const mockOrders: Order[] = [
  { id: "ORD-10234", date: "2024-11-05", total: 45.99, status: "delivered", items: 3 },
  { id: "ORD-10189", date: "2024-10-28", total: 89.5, status: "delivered", items: 5 },
];

const quickActions = [
  { id: "refill", title: "Refill Prescription", icon: Pill },
  { id: "upload", title: "Upload Prescription", icon: FileText },
  { id: "consult", title: "Book Consultation", icon: Calendar },
  { id: "history", title: "View History", icon: Activity },
];

const adminStats = [
  { icon: Users, value: "1,247", label: "Active Patients", trend: "+12%" },
  { icon: Pill, value: "342", label: "Pending Prescriptions", trend: "-" },
  { icon: Package, value: "89", label: "Orders Today", trend: "+8%" },
  { icon: DollarSign, value: "$12,450", label: "Revenue Today", trend: "+15%" },
];

const adminControls = [
  { id: "rx", icon: Pill, title: "Prescription Management", desc: "Review, approve, and manage patient prescriptions.", primary: "Review Prescriptions" },
  { id: "inv", icon: ShoppingBag, title: "Inventory & Products", desc: "Manage medication inventory and pricing.", primary: "Manage Inventory" },
  { id: "ord", icon: Package, title: "Order Processing", desc: "Process orders and track deliveries.", primary: "Process Orders" },
  { id: "pat", icon: Users, title: "Patient Management", desc: "Manage patient accounts and histories.", primary: "View Patients" },
  { id: "ana", icon: BarChart3, title: "Analytics & Reports", desc: "Access business intelligence and metrics.", primary: "View Analytics" },
  { id: "sys", icon: Settings, title: "System Settings", desc: "Configure system and manage permissions.", primary: "System Settings" },
];

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>("customer");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const sidebarRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  const prescriptions = useMemo(() => 
    user?.isLoggedIn && role === "customer" ? mockPrescriptions : [], 
    [user, role]
  );
  
  const orders = useMemo(() => 
    user?.isLoggedIn && role === "customer" ? mockOrders : [], 
    [user, role]
  );
  
  const activePrescriptions = useMemo(() => 
    prescriptions.filter(p => p.status === "active"), 
    [prescriptions]
  );
  
  const availableRefills = useMemo(() => 
    prescriptions.filter(p => p.refillsLeft > 0).length, 
    [prescriptions]
  );

  const healthStats = useMemo(() => [
    { icon: FileText, value: prescriptions.length, label: "Prescriptions" },
    { icon: Package, value: orders.length, label: "Orders" },
    { icon: CheckCircle2, value: availableRefills, label: "Available Refills" },
  ], [prescriptions.length, orders.length, availableRefills]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(mockUser);
      setRole(mockUser.role === "admin" ? "customer" : "customer");
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;
    
    const handleClick = (e: MouseEvent) => {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(e.target as Node) && 
        menuRef.current && 
        !menuRef.current.contains(e.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        menuRef.current?.focus();
      }
    };
    
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const handleRoleSwitch = useCallback((newRole: Role) => {
    setRole(newRole);
    setSidebarOpen(false);
  }, []);

  const formatDate = useCallback((dateString: string, short?: boolean) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", 
      short 
        ? { month: "short", day: "numeric" } 
        : { month: "short", day: "numeric", year: "numeric" }
    );
  }, []);

  const getStatusIcon = useCallback((status: string) => {
    const icons: Record<string, typeof CheckCircle2> = { 
      delivered: CheckCircle2, 
      shipped: Truck, 
      processing: Clock 
    };
    const Icon = icons[status] || Package;
    return <Icon size={16} />;
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <span>Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user?.isLoggedIn) {
    return (
      <div className={styles.container}>
        <div className={styles.login}>
          <Shield size={64} className={styles.loginIcon} />
          <h2>Secure Access Required</h2>
          <p>Please log in to access your health dashboard and prescription information.</p>
          <button className={styles.loginBtn}>
            <User size={20} />
            Sign In Securely
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {sidebarOpen && <div className={styles.overlay} />}

      <aside ref={sidebarRef} className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Pill size={28} />
            </div>
            <span>HealthRx</span>
          </div>
          <button 
            className={styles.close} 
            onClick={() => setSidebarOpen(false)} 
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className={styles.nav}>
          <button 
            className={`${styles.navItem} ${role === "customer" ? styles.active : ""}`} 
            onClick={() => handleRoleSwitch("customer")}
          >
            <Home size={20} />
            <span>Dashboard</span>
            <ChevronRight size={16} className={styles.arrow} />
          </button>
          <button className={styles.navItem}>
            <Pill size={20} />
            <span>Prescriptions</span>
            <ChevronRight size={16} className={styles.arrow} />
          </button>
          <button className={styles.navItem}>
            <Package size={20} />
            <span>Orders</span>
            <ChevronRight size={16} className={styles.arrow} />
          </button>
          <button className={styles.navItem}>
            <CreditCard size={20} />
            <span>Payments</span>
            <ChevronRight size={16} className={styles.arrow} />
          </button>
          <button className={styles.navItem}>
            <Settings size={20} />
            <span>Settings</span>
            <ChevronRight size={16} className={styles.arrow} />
          </button>
          {user.role === "admin" && (
            <button 
              className={`${styles.navItem} ${role === "admin" ? styles.active : ""}`} 
              onClick={() => handleRoleSwitch("admin")}
            >
              <Shield size={20} />
              <span>Admin Panel</span>
              <ChevronRight size={16} className={styles.arrow} />
            </button>
          )}
        </nav>

        <div className={styles.footer}>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <User size={20} />
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{user.name}</div>
              <div className={styles.userRole}>{user.role}</div>
            </div>
            <button className={styles.logout} aria-label="Log out">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <button 
            ref={menuRef}
            className={styles.menu} 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <div className={styles.headerContent}>
            <div>
              <h1>Hello, {user.name.split(" ")[0]} 👋</h1>
              <p>{role === "admin" ? "Admin Dashboard" : "Here's your health overview"}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.btn}>
                <Bell size={20} />
                <span className={styles.badge}>3</span>
              </button>
              <button className={styles.btn}>
                <Calendar size={20} />
              </button>
            </div>
          </div>
        </header>

        {role === "customer" && (
          <>
            <section className={styles.section}>
              <h2>Quick Actions</h2>
              <div className={styles.quickGrid}>
                {quickActions.map(({ id, title, icon: Icon }) => (
                  <button key={id} className={styles.quickCard}>
                    <div className={styles.qIcon}>
                      <Icon size={24} />
                    </div>
                    <span>{title}</span>
                    <ChevronRight size={18} className={styles.qArrow} />
                  </button>
                ))}
              </div>
            </section>

            <div className={styles.grid}>
              <section className={styles.prescriptions}>
                <div className={styles.secHeader}>
                  <h2>Active Prescriptions</h2>
                  <button className={styles.viewAll}>
                    View All
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className={styles.rxList}>
                  {activePrescriptions.length === 0 ? (
                    <div className={styles.empty}>No active prescriptions found.</div>
                  ) : (
                    activePrescriptions.map(rx => (
                      <article key={rx.id} className={styles.rxCard}>
                        <div className={styles.rxHeader}>
                          <div className={styles.rxIcon}>
                            <Pill size={20} />
                          </div>
                          <span className={styles.rxId}>{rx.id}</span>
                        </div>
                        <h3>{rx.medication}</h3>
                        <div className={styles.rxDetails}>
                          <div>
                            <span>Refills Left</span>
                            <span className={styles.refillBadge}>{rx.refillsLeft}</span>
                          </div>
                          <div>
                            <span>Expires</span>
                            <span>{formatDate(rx.expiryDate)}</span>
                          </div>
                        </div>
                        <button className={styles.refillBtn}>
                          <Pill size={16} />
                          Refill Now
                        </button>
                      </article>
                    ))
                  )}
                </div>
              </section>

              <aside className={styles.sidebar2}>
                <section className={styles.card}>
                  <h2>Recent Orders</h2>
                  <div className={styles.orderList}>
                    {orders.map(o => (
                      <article key={o.id} className={styles.order}>
                        <div className={styles.orderHeader}>
                          <span className={styles.orderId}>{o.id}</span>
                          <span className={`${styles.status} ${styles[o.status]}`}>
                            {getStatusIcon(o.status)}
                            {o.status}
                          </span>
                        </div>
                        <div className={styles.orderDetails}>
                          <span>{formatDate(o.date, true)}</span>
                          <span className={styles.total}>${o.total.toFixed(2)}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                  <button className={styles.viewAllSec}>
                    View All Orders
                    <ChevronRight size={16} />
                  </button>
                </section>

                <section className={styles.card}>
                  <h2>Health Overview</h2>
                  <div className={styles.stats}>
                    {healthStats.map(({ icon: Icon, value, label }, i) => (
                      <div key={i} className={styles.stat}>
                        <div className={styles.statIcon}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <span className={styles.statVal}>{value}</span>
                          <span>{label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </>
        )}

        {role === "admin" && (
          <>
            <section className={styles.section}>
              <h2>System Overview</h2>
              <div className={styles.adminStats}>
                {adminStats.map(({ icon: Icon, value, label, trend }, i) => (
                  <div key={i} className={styles.adminStat}>
                    <div className={styles.adminIcon}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <span className={styles.adminVal}>{value}</span>
                      <span>{label}</span>
                    </div>
                    <span className={`${styles.trend} ${trend.startsWith("+") ? styles.up : trend === "-" ? styles.neutral : styles.down}`}>
                      {trend}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h2>Administrative Controls</h2>
              <div className={styles.adminGrid}>
                {adminControls.map(({ id, icon: Icon, title, desc, primary }) => (
                  <article key={id} className={styles.adminCard}>
                    <div className={styles.adminCardIcon}>
                      <Icon size={28} />
                    </div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    <button className={styles.primary}>
                      {primary}
                      <ChevronRight size={16} />
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;