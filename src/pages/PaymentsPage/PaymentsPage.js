import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const PaymentPage = () => {
  const { user } = useAuth();
  const db = getFirestore();

  const handlePaymentSuccess = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        membership: true,
      });
      // Redirigir o mostrar mensaje de éxito
    }
  };

  return (
    <div>
      <h1>Pago</h1>
      <button onClick={handlePaymentSuccess}>Completar Pago</button>
    </div>
  );
};

export default PaymentPage;
