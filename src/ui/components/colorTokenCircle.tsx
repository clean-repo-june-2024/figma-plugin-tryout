interface ColorTokenCircleProps {
  red: number;
  green: number;
  blue: number;
  opacity: number;
}

const ColorTokenCircle = ({red,green,blue,opacity}:ColorTokenCircleProps) => {
  return (
    <div
      style={{
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        backgroundColor: `rgba(${red},${green},${blue},${opacity})`,
      }}
    ></div>
  )
}

export default ColorTokenCircle;