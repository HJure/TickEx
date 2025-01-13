import { useState, useEffect } from 'react';
import '../style/SavePreferences.css';

const SavePreferences = ({setPreferences}) => {
    const access_token = localStorage.getItem("access_token");
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

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
                const categories = data.map(item => item.nazVrDog)
                setCategories(categories);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        dohvatiDogadaje();
    }, [backendUrl]);
    
    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) => {
            console.log('Selected categories:', selectedCategories);
            if (prev.includes(category)) {
                return prev.filter((item) => item !== category);
            }else{
                return [...prev, category];                
            }
        })
    }
    
    useEffect(() => {
        console.log('Updated selected categories:', selectedCategories);
        localStorage.setItem("selectedCategories", JSON.stringify(selectedCategories)); 
    }, [selectedCategories]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        
        const response = await fetch(`${backendUrl}/api/savePreferences`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
            body: JSON.stringify({categories: localStorage.getItem("savedPreferences"), email: localStorage.getItem("user_email")}),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            console.log('Selected categories saved:', selectedCategories);
            setPreferences(selectedCategories);
        } else {
            throw new Error('Failed to save preferences');
        }
    } catch (error) {
        console.error('Error while saving preferences:', error);
    }

    };

    return (
    <div className="savePreferences">
        <form onSubmit={handleSubmit}>
            {categories.map((category, index) => (
                <div key={index} className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        id={`checkbox-${index}`}
                        value={category}
                        onChange={() => handleCategoryChange(category)}
                    />
                    <div className="categoryName">
                        {category}
                    </div>
                </div>
            ))}
        </form>
    </div>
    );

}
export default SavePreferences;