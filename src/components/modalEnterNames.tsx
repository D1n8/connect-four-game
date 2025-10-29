import { useState } from "react";

interface ModalEnterNamesProps {
    onSubmit: (name1: string, name2: string) => void;
}

function ModalEnterNames({ onSubmit }: ModalEnterNamesProps) {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name1.trim() || !name2.trim()) return alert("Введите имена обоих игроков!");
        onSubmit(name1.trim(), name2.trim());
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2 className="modal-title">Введите имена игроков</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label className="modal-input-container">
                        Игрок 1:
                        <input type="text" value={name1} onChange={(e) => setName1(e.target.value)} placeholder="Имя первого игрока" />
                    </label>
                    <label className="modal-input-container">
                        Игрок 2:
                        <input type="text" value={name2} onChange={(e) => setName2(e.target.value)} placeholder="Имя второго игрока"
                        />
                    </label>
                    <button type="submit" className="btn">Начать игру</button>
                </form>
            </div>
        </div>
    );
}

export default ModalEnterNames;