interface IChipProps {
    color: 'red' | 'blue'
}

function Chip({color}: IChipProps) {
    return (
        <div className={`chip ${color}`}>

        </div>
    );
}

export default Chip;