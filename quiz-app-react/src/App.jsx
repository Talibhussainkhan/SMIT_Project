import axios from 'axios'
import { useEffect, useState } from 'react'

 function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const App = () => {
   const [quiz, setQuiz] = useState([]);
   const [keys, setKeys] = useState([]);
   const [index, setIndex] = useState(0);
   const [selectedAnswer, setSelectedAnswer] = useState('');
   const [score, setScore] = useState(0);
   const [shuffledOptions, setShuffledOptions] = useState([]);

   const getDataFromApi = async ()=>{
    try {
      const { data } = await axios.get('https://the-trivia-api.com/v2/questions')
    const copyData = [...data]
    // console.log(data)
    let keys = copyData.map((data)=>{
      return [...data.incorrectAnswers, data.correctAnswer];
     
    })
    setKeys(keys);
    setQuiz(data);
    } catch (error) {
      console.log(error)
    }
   };

   const handleNext = ()=>{
    if(selectedAnswer === ''){
      return alert('Please select answer first')
    };
    
    let tempScore = score;

    if (selectedAnswer === quiz[index].correctAnswer) {
      tempScore = tempScore + 1;
      setScore(tempScore);
      }
    

    if(index === quiz.length - 1){
      alert(`Quiz End!your score ${tempScore}/${quiz.length}`);
      setIndex(0);
      setSelectedAnswer('');
      setScore(0);
      return
    }
    setIndex(index + 1)
    setSelectedAnswer('')
   }


  useEffect(() => {
   setShuffledOptions(shuffle(keys[index] || []));
  }, [index, quiz, keys])
  
   
   useEffect(() => {
    getDataFromApi()
   }, [])
   console.log(quiz[index]?.correctAnswer);
   console.log(score)
   
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
  <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
    <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-4">
      Quiz App
    </h1>
    <hr className="mb-6" />

    <p className="text-base sm:text-lg font-semibold text-gray-800 mb-6">
      {quiz[index]?.question.text}
    </p>

    <div className="space-y-3">
      {shuffledOptions?.map((key, idx) => (
        <label
          key={idx}
          className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition 
          ${selectedAnswer === key 
            ? "bg-indigo-100 border-indigo-400" 
            : "hover:bg-gray-50 border-gray-300"}`}
        >
          <input
            type="radio"
            value={key}
            checked={selectedAnswer === key}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-gray-700 text-sm sm:text-base">{key}</span>
        </label>
      ))}
    </div>

    <div className="mt-6 flex justify-end">
      <button
        onClick={handleNext}
        className="px-4 sm:px-6 py-2 bg-indigo-600 text-white rounded-xl shadow-md 
        hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        disabled={!selectedAnswer}
      >
        Next
      </button>
    </div>
  </div>
</div>
  )
}

export default App