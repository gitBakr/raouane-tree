
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Tree = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();

  const familyData = {
    patriarch: {
      id: "1",
      name: "Omar",
      relationship: "Patriarche",
      photo: "placeholder.svg",
    },
    generations: [
      [
        {
          id: "2",
          name: "Mohamed",
          relationship: "Grand-père",
          photo: "placeholder.svg",
        }
      ],
      [
        {
          id: "3",
          name: "Tahar",
          relationship: "Père",
          photo: "placeholder.svg",
        },
        {
          id: "4",
          name: "Fatima",
          relationship: "Mère",
          photo: "placeholder.svg",
        }
      ],
      [
        {
          id: "5",
          name: "Lassad",
          relationship: "Frère",
          photo: "placeholder.svg",
          children: ["8", "9", "10"]
        },
        {
          id: "6",
          name: "Youssef",
          relationship: "Frère",
          photo: "placeholder.svg",
          children: ["11"]
        },
        {
          id: "7",
          name: "Mohamed",
          relationship: "Utilisateur",
          photo: "placeholder.svg",
          children: ["12", "13"]
        }
      ],
      [
        {
          id: "8",
          name: "Esma",
          relationship: "Nièce",
          photo: "placeholder.svg",
        },
        {
          id: "9",
          name: "Souad",
          relationship: "Nièce",
          photo: "placeholder.svg",
        },
        {
          id: "10",
          name: "Zineb",
          relationship: "Nièce",
          photo: "placeholder.svg",
        },
        {
          id: "11",
          name: "Meriem",
          relationship: "Nièce",
          photo: "placeholder.svg",
        },
        {
          id: "12",
          name: "Aicha",
          relationship: "Fille",
          photo: "placeholder.svg",
        },
        {
          id: "13",
          name: "Houda",
          relationship: "Fille",
          photo: "placeholder.svg",
        }
      ]
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-family-yellow-light via-white to-family-blue-light p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-family-dark hover:text-family-blue transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Retour
        </button>

        <div className="flex flex-col items-center space-y-16">
          {/* Patriarche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="w-24 h-24 rounded-lg overflow-hidden mb-2">
                <img
                  src={familyData.patriarch.photo}
                  alt={familyData.patriarch.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-family-dark">
                {familyData.patriarch.name}
              </h3>
              <p className="text-sm text-gray-600">
                {familyData.patriarch.relationship}
              </p>
            </div>
            <div className="absolute left-1/2 bottom-0 w-px h-8 bg-family-dark transform translate-y-full" />
          </motion.div>

          {/* Générations */}
          {familyData.generations.map((generation, genIndex) => (
            <div key={genIndex} className="w-full">
              <div className="relative">
                {genIndex > 0 && (
                  <div className="absolute top-0 left-1/2 w-px h-8 bg-family-dark transform -translate-y-full" />
                )}
                <div className="flex justify-center items-start space-x-8">
                  {generation.map((member, memIndex) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: memIndex * 0.1 }}
                      className={`relative ${
                        member.id === memberId ? "ring-4 ring-family-blue rounded-xl" : ""
                      }`}
                    >
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                        <div className="w-20 h-20 rounded-lg overflow-hidden mb-2">
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-family-dark">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {member.relationship}
                        </p>
                      </div>
                      {member.children && (
                        <div className="absolute left-1/2 bottom-0 w-px h-8 bg-family-dark transform translate-y-full" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Tree;
