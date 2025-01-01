import Image from 'next/image';

const Card = ({ image, text, date }) => {
  return (
    <div className="rounded-lg p-4 m-4 transition-transform duration-300 transform hover:translate-x-2">
      <div className="relative w-full h-48">
        <Image
          src={`data:image/jpeg;base64,${image}`}
          alt="Sample"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <p className="mt-2 dark:text-white">{text}</p>
      <p className="mt-1 dark:text-white">{new Date(date).toLocaleString()}</p>
    </div>
  );
};

export default Card;