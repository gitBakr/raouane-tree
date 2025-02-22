
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Select = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const familyMembers = [
    { id: "1", name: "Omar", relationship: "Patriarche", photo: "placeholder.svg" },
    { id: "2", name: "Mohamed", relationship: "Grand-père", photo: "placeholder.svg" },
    { id: "3", name: "Tahar", relationship: "Père", photo: "placeholder.svg" },
    { id: "4", name: "Fatima", relationship: "Mère", photo: "placeholder.svg" },
    { id: "5", name: "Lassad", relationship: "Frère", photo: "placeholder.svg" },
    { id: "6", name: "Youssef", relationship: "Frère", photo: "placeholder.svg" },
    { id: "7", name: "Mohamed", relationship: "Utilisateur", photo: "placeholder.svg" },
    { id: "8", name: "Esma", relationship: "Nièce", photo: "placeholder.svg" },
    { id: "9", name: "Souad", relationship: "Nièce", photo: "placeholder.svg" },
    { id: "10", name: "Zineb", relationship: "Nièce", photo: "placeholder.svg" },
    { id: "11", name: "Meriem", relationship: "Nièce", photo: "placeholder.svg" },
    { id: "12", name: "Aicha", relationship: "Fille", photo: "placeholder.svg" },
    { id: "13", name: "Houda", relationship: "Fille", photo: "placeholder.svg" },
  ];

  const filteredMembers = familyMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.relationship.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-family-yellow-light via-white to-family-blue-light p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-family-dark mb-8 text-center">
          Qui êtes-vous dans la famille ?
        </h1>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou relation familiale..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-family-blue"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/tree/${member.id}`)}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-family-dark">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.relationship}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Select;
