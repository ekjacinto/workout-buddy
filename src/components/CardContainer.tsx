import React from "react";
import Card from "../components/Card";
import PowerliftingCat from "../assets/PowerLiftingCat.jpg";
import BodyBuildingCat from "../assets/BodyBuildingCat.jpg";
import CalisthenicsCat from "../assets/CalisthenicsCat.jpg";

type CardContainerProps = {
  fadeInCards: boolean;
  fadeOutCards: boolean;
  onCardClick: (cardName: string) => void;
};

const CardContainer: React.FC<CardContainerProps> = ({
  fadeInCards,
  fadeOutCards,
  onCardClick,
}) => {
  const cardData = [
    { imageName: "BodyBuilding", image: BodyBuildingCat },
    { imageName: "Powerlifting", image: PowerliftingCat },
    { imageName: "Calisthenics", image: CalisthenicsCat },
  ];

  return (
    <div className="flex justify-evenly">
      {cardData.map((card, index) => (
        <Card
          key={index}
          onClick={() => onCardClick(card.imageName)}
          imageName={card.imageName}
          image={card.image}
          className={`${fadeInCards ? "fade-in" : ""} ${fadeOutCards ? "fade-out" : ""}`}
        />
      ))}
    </div>
  );
};

export default CardContainer;
