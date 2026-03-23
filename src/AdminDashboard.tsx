import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { db, auth } from './firebase';
import { ArrowLeft, LogOut, ShieldAlert, Users, Database } from 'lucide-react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (!u) setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setEntries([]);
      return;
    }

    setLoading(true);
    setError('');
    const q = query(collection(db, 'waitlist'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEntries(data);
      setLoading(false);
    }, (err) => {
      setLoading(false);
      if (err.message.includes('Missing or insufficient permissions')) {
        setError('You do not have admin permissions to view this data. Please ensure you are logged in with fangz9691@gmail.com.');
      } else {
        setError(err.message);
      }
      try {
        handleFirestoreError(err, OperationType.LIST, 'waitlist');
      } catch (e) {
        // Error is thrown as per requirements
      }
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="min-h-screen bg-background text-on-background p-6 md:p-12 font-sans selection:bg-primary selection:text-on-primary">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-8 font-label text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Site
        </button>

        <div className="flex justify-between items-end mb-8 border-b border-outline-variant/20 pb-6">
          <div>
            <h1 className="font-headline text-3xl font-bold text-on-surface flex items-center gap-3">
              <Database className="w-8 h-8 text-primary" />
              Waitlist Database
            </h1>
            <p className="text-on-surface-variant mt-2 text-sm">Secure local-first admin environment.</p>
          </div>
          {user && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-error-dim hover:text-error transition-colors font-label text-xs uppercase tracking-widest"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          )}
        </div>

        {!user ? (
          <div className="bg-surface-container-low border border-outline-variant/20 p-12 text-center rounded-sm">
            <ShieldAlert className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="font-headline text-xl font-bold mb-2">Admin Access Required</h2>
            <p className="text-on-surface-variant mb-8 max-w-md mx-auto text-sm">
              Please sign in with your authorized administrator account to view the waitlist.
            </p>
            <button 
              onClick={handleLogin}
              className="bg-primary text-on-primary font-bold px-6 py-3 text-sm uppercase tracking-widest hover:brightness-110 transition-all rounded-sm"
            >
              Sign in with Google
            </button>
          </div>
        ) : error ? (
          <div className="bg-error-container/10 border border-error-dim/30 p-8 rounded-sm text-center">
            <ShieldAlert className="w-12 h-12 text-error-dim mx-auto mb-4" />
            <h2 className="font-headline text-xl font-bold text-error-dim mb-2">Access Denied</h2>
            <p className="text-on-surface-variant text-sm">{error}</p>
          </div>
        ) : loading ? (
          <div className="text-center py-20 text-on-surface-variant font-mono text-sm animate-pulse">
            [ Fetching records... ]
          </div>
        ) : (
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant/20 flex items-center gap-4 bg-surface-dim">
              <Users className="w-5 h-5 text-secondary" />
              <span className="font-label text-xs tracking-widest uppercase text-on-surface-variant">
                Total Signups: <span className="text-primary font-bold">{entries.length}</span>
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/20 bg-surface-container-high/50">
                    <th className="p-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Email Address</th>
                    <th className="p-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Date Joined</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  {entries.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="p-8 text-center text-on-surface-variant">No entries yet.</td>
                    </tr>
                  ) : (
                    entries.map((entry) => (
                      <tr key={entry.id} className="border-b border-outline-variant/10 hover:bg-surface-container-high/30 transition-colors">
                        <td className="p-4 text-on-surface">{entry.email}</td>
                        <td className="p-4 text-on-surface-variant">
                          {entry.createdAt ? new Date(entry.createdAt.toDate()).toLocaleString() : 'Just now'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
