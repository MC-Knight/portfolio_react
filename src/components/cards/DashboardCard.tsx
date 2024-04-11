interface DashboardCardProps {
  image: string;
  text: string;
  number: number;
}

function DashboardCard({ image, text, number }: DashboardCardProps) {
  return (
    <div className="card">
      <img src={image} alt="card-image" />
      <p className="card-text">{text}</p>
      <p className="card-number">{number}</p>
    </div>
  );
}

export default DashboardCard;
