import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ZoomIn, ZoomOut, ChevronDown } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

const Tree = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [visibleGenerations, setVisibleGenerations] = useState(4);

  // Mémorisation des données familiales pour éviter les re-calculs inutiles
  const familyData = useMemo(() => ({
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
  }), []);

  // Fonction optimisée pour le rendu des membres
  const renderFamilyMember = useCallback((member, memIndex, genIndex) => {
    const isSelected = member.id === memberId;
    const hasChildren = member.children && member.children.length > 0;

    // Calculer la taille en fonction du niveau de zoom
    const baseSize = 20; // Taille de base de l'image
    const adjustedSize = Math.floor(baseSize * zoomLevel);

    // Définir une couleur de fond différente selon la génération
    const getBgColor = () => {
      if (genIndex === -1) return "bg-yellow-200"; // Patriarche
      switch (genIndex) {
        case 0: return "bg-blue-200";
        case 1: return "bg-green-200";
        case 2: return "bg-violet-200";
        case 3: return "bg-gray-200";
        default: return "bg-gray-300";
      }
    };

    return (
      <motion.div
        key={member.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(memIndex * 0.1, 1) }}
        className={`relative ${isSelected ? "ring-4 ring-family-blue rounded-xl" : ""}`}
      >
        <div className={`${getBgColor()} backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200`}
             style={{ width: `${adjustedSize * 4}px` }}>
          <div 
            className="rounded-lg overflow-hidden mb-2"
            style={{ width: `${adjustedSize * 2}px`, height: `${adjustedSize * 2}px` }}
          >
            <img
              loading="lazy"
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className={`text-lg font-semibold text-family-dark`}
              style={{ fontSize: `${Math.max(14 * zoomLevel, 12)}px` }}>
            {member.name}
          </h3>
          <p className="text-sm text-gray-600"
             style={{ fontSize: `${Math.max(12 * zoomLevel, 10)}px` }}>
            {member.relationship}
          </p>
        </div>
        {hasChildren && genIndex < visibleGenerations - 1 && (
          <div className="absolute left-1/2 bottom-0 w-px h-8 bg-family-dark transform translate-y-full" />
        )}
      </motion.div>
    );
  }, [memberId, zoomLevel, visibleGenerations]);

  // Contrôles de zoom et de générations visibles
  const zoomControls = (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2">
        <button
          onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2.0))}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Agrandir"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Réduire"
        >
          <ZoomOut size={20} />
        </button>
      </div>
      {familyData.generations.length > visibleGenerations && (
        <button
          onClick={() => setVisibleGenerations(prev => Math.min(prev + 1, familyData.generations.length))}
          className="bg-family-blue text-white p-2 rounded-lg shadow-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
          title="Afficher plus de générations"
        >
          <span>Voir plus</span>
          <ChevronDown size={16} />
        </button>
      )}
    </div>
  );

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

        <div className="flex flex-col items-center space-y-16 overflow-x-auto">
          {/* Patriarche */}
          {renderFamilyMember(familyData.patriarch, 0, -1)}

          {/* Générations */}
          {familyData.generations.slice(0, visibleGenerations).map((generation, genIndex) => (
            <div key={genIndex} className="w-full min-w-max">
              <div className="relative">
                {genIndex > 0 && (
                  <div className="absolute top-0 left-1/2 w-px h-8 bg-family-dark transform -translate-y-full" />
                )}
                <div className="flex justify-center items-start space-x-8">
                  {generation.map((member, memIndex) => 
                    renderFamilyMember(member, memIndex, genIndex)
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {zoomControls}
      </motion.div>
    </div>
  );
};

export default Tree;
