import { useEffect, useState } from "react";
// import styled from "styled-components";
import { useParams } from "react-router-dom";
import "../style/Recipe.css";

function Recipe() {

    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('instructions')

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const detailData = await data.json();
        setDetails(detailData);
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    return (
        <div className="Recipe-container">
            <div className="container-heading">
                <h2>{details.title}</h2>
            </div>

            <div className="container-body">
                <div className="Picture">
                    <img src={details.image} alt="" />
                </div>

                <div className="Information">
                    <div className="Buttons">
                        <button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}>Instructions</button>
                        <button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}>Ingredients</button>
                    </div>

                    <div className="instruction">
                        {activeTab === "instructions" && (
                            <div>
                                <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                                <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                            </div>
                        )}

                        {activeTab === "ingredients" && (
                            <ul className="ingredients">
                                {details.extendedIngredients.map((ingredient) => (
                                    <li key={ingredient.id}>{ingredient.original}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
        // <DetailWrapper>
        //     <div className="Picture">
        //         <h2>{details.title}</h2>
        //         <img src={details.image} alt="" />
        //     </div>

        //     <Info className="Information">
        //         <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}>Instructions</Button>
        //         <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}>Ingredients</Button>
        //         {activeTab === "instructions" && (
        //             <div>
        //                 <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
        //                 <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
        //             </div>
        //         )}

        //         {activeTab === "ingredients" && (
        //             <ul>
        //                 {details.extendedIngredients.map((ingredient) => (
        //                     <li key={ingredient.id}>{ingredient.original}</li>
        //                 ))}
        //             </ul>
        //         )}


        //     </Info>
        // </DetailWrapper>
    )
}

// const DetailWrapper = styled.div`
//     margin-top: 10rem;
//     margin-bottom: 5rem;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;




//     .active{
//         background: linear-gradient(35deg, #494949, #313131);
//         color: white;
//     }

//     h2{
//         margin-bottom: 2rem;
//     }

//     li{
//         font-size: 1.2rem;
//         line-height: 2.5rem;
//     }

//     ul{
//         margin-top: 2rem;
//     }

//     @media (max-width: 1024px){
//         flex-direction: column;
//     }
// `;

// const Button = styled.button`
//     padding: 1rem 2rem;
//     color: #313131;
//     border: 2px solid black;
//     margin-right: 2rem;
//     font-weight: 600;
// `;

// const Info = styled.div`
//     margin-left: 10rem;

//     @media (max-width: 1024px){
//         margin-left: 0rem;
//     }
// `;

export default Recipe;