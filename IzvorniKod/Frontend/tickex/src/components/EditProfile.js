import React, { useState, useEffect } from 'react';
import '../style/EditProfile.css';

const EditProfile = ({ firstName, lastName, setFirstName, setLastName, onSave, onCancel }) => {
    const [categories, setCategories] = useState([]);
    const storedCategories = JSON.parse(localStorage.getItem("selectedCategories"))
    const [selectedCategories, setSelectedCategories] = useState(storedCategories);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
    const email = localStorage.getItem("user_email");

    useEffect(() => {
        const dohvatiDogadaje = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/vrsta-dogadaja`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Error while fetching event types');
                const data = await response.json();
                const categories = data.map(item => item.nazVrDog);
                setCategories(categories);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        dohvatiDogadaje();
    }, [backendUrl]);

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter((item) => item !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    useEffect(() => {
        localStorage.setItem("selectedCategories", JSON.stringify(selectedCategories));
    }, [selectedCategories]);

    const handleSave = () => {
        const url = `${backendUrl}/api/savePreferences?email=${encodeURIComponent(email)}`;
        const selectedCategories = JSON.parse(localStorage.getItem("selectedCategories") || "[]");
        
        fetch(url, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedCategories),
        }).then(() => {})
        .catch((err) => {
            console.log(err);
        });

        setTimeout(() => {
            onSave();
        }, 1000);
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <h2>Uredi Profil</h2>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ime"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Prezime"
                />

                <h3 className='n'>Postavke kategorija</h3>
                {categories.map((category, index) => (
                    <div key={index} className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            id={`checkbox-${index}`}
                            value={category}
                            onChange={() => handleCategoryChange(category)}
                            checked={selectedCategories.includes(category)}
                        />
                        <label htmlFor={`checkbox-${index}`}>{category}</label>
                    </div>
                ))}

                <div className="popup-buttons">
                    <button onClick={handleSave}>Spremi</button>
                    <button onClick={onCancel}>Otkaži</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
