interface CardProps {
  onClick?: () => void;
  imageName: string;
  imageDesc: string;
  image: string | undefined;
  className?: string;
}

const Card = ({ onClick, imageName, imageDesc, image, className }: CardProps) => {
  return (
    <main
      onClick={onClick}
      className={`border-[#a2a1a1] border-[2px] bg-[#010409] w-72 h-[20rem] rounded-lg ${className || ""}`}
    >
      <section className="flex flex-col items-center mt-4 font-sans italic gap-6">
        <p className="font-lightbold text-3xl">{imageName}</p>
        <img src={image} className="w-52 h-52 rounded-lg" />
      </section>
    </main>
  )
}

export default Card