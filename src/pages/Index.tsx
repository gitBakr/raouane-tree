
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-family-yellow-light via-white to-family-blue-light">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-4 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-family-dark mb-6">
          Notre Histoire Familiale
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Explorez notre arbre généalogique et découvrez les histoires qui ont façonné notre famille à travers les générations.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/select")}
          className="bg-family-blue text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-opacity-90 transition-colors"
        >
          Commencer l'exploration
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Index;
