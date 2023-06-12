import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {METHOD, recipeUrl} from '../../config/constants/api';
import {fetchData, promiseHandler} from '../../utils/promise';
import './AddEditRecipePage.css';

const recipeFields = {
  name: {
    id: 'name',
    text: 'name',
    type: 'input',
    value: '',
    pleaceholder: 'name',
    size: 3
  },
  ingredients: {
    id: 'ingredients',
    text: 'ingredients',
    type: 'array',
    value: '',
    pleaceholder: 'ingredients (enter a comma between each ingrediant)',
    size: 5
  },
  howToCreate: {
    id: 'howToCreate',
    text: 'howToCreate',
    type: 'textarea',
    value: '',
    pleaceholder: 'howToCreate',
    size: 5
  },
  timeToWork: {
    id: 'timeToWork',
    text: 'timeToWork',
    type: 'array',
    value: '',
    pleaceholder: 'timeToWork',
    size: 5
  },
  imgUrl: {
    id: 'imgUrl',
    text: 'imgUrl',
    type: 'input',
    value: '',
    pleaceholder: 'imgUrl',
    size: 5
  }
};

const AddRecipePage = () => {
  const {pathname, state} = useLocation();
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState(recipeFields);
  const {token} = useSelector(state => state.user);

  useEffect(() => {
    if (isEditPage()) {
      const editedRecipe = {};
      editedRecipe._id = {
        id: 'id',
        text: 'id',
        type: 'text',
        disabled: true,
        pleaceholder: 'id',
        value: state.recipe._id
      };
      Object.values(recipeFields).forEach(field => {
        editedRecipe[field.id] = {
          ...field,
          value: state.recipe[field.text] || ''
        };
      });
      setRecipeData(editedRecipe);
    }
  }, []);

  const isEditPage = () => {
    return pathname.includes('edit-recipe');
  };

  const handleInputChange = e => {
    const updatedField = {
      ...recipeData[e.target.id],
      value: e.target.value
    };
    setRecipeData({
      ...recipeData,
      [e.target.id]: updatedField
    });
  };

  const handleAddEditRecipe = async e => {
    e.preventDefault();
    const filteredRecipe = Object.keys(recipeData).reduce((obj, key) => {
      obj[key] = recipeData[key].value;
      return obj;
    }, {});
    console.log("filteredRecipe['ingredients']", filteredRecipe['ingredients']);
    filteredRecipe['ingredients'] = filteredRecipe['ingredients'].split(',');
    console.log('filteredRecipe', filteredRecipe);
    const [result, error] = await promiseHandler(
      fetchData(
        `${recipeUrl}`,
        isEditPage() ? METHOD.PUT : METHOD.POST,
        filteredRecipe,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      )
    );
    navigate(-1);
  };

  return (
    <div className="addRecipeContainer">
      <div className="addRecipeTitle">add or edit recipe</div>
      <form onSubmit={handleAddEditRecipe}>
        <div>
          {Object.values(recipeData).map(field => (
            <div key={field.id}>
              <input
                className="inputClass form-control"
                id={field.id}
                disabled={field.disabled}
                minLength={field.size}
                type={field.type}
                value={
                  typeof field.value === 'string'
                    ? field.value
                    : field.value.map(item => item + ',')
                }
                placeholder={field.pleaceholder}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <button className="addRecipeButton" type="submit">
            {isEditPage() ? 'Save changes' : 'Add new'}
          </button>
          <button className="addRecipeButton" onClick={() => navigate(-1)}>
            go back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipePage;
