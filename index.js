const synth = speechSynthesis,
    speechBtn = document.querySelector(".speech"),
    quoteContent = document.querySelector(".content");


function Footer() {
    return (<div className="mt-auto w-100 text-center footer"><p className="text-center mb-0"><i class="fa-regular fa-lightbulb"></i> Make by D-light</p></div>)
}

function App() {
    const [quotes, setQuotes] = React.useState([]);
    const [randomQuotes, setRandomQuotes] = React.useState([]);
    const [color, setColor] = React.useState(['#fff']);
    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://type.fit/api/quotes");
            const data = await response.json();
            setQuotes(data);
            let randIndex = Math.floor(Math.random() * data.length);
            setRandomQuotes(data[randIndex]);
        }

        fetchData();
    }, []);

    const getNewQuote = () => {
        const colors = [
            "#77DD77",
            "#836953",
            "#89cff0",
            "#99c5c4",
            " #aa9499 ",
            " #9adedb ",
            "#aaf0d1",
            "#b2fba5",
            " #b39eb5 ",
            " #bdb0d0 ",
            " #bdb0d0 ",
            "#bee7a5",
            "#ff694f",
            "#ca9bf7",
            "#ffb7ce"
        ]

        let randIndex = Math.floor(Math.random() * quotes.length);
        let randColorIndex = Math.floor(Math.random() * colors.length)
        setRandomQuotes(quotes[randIndex]);
        setColor(colors[randColorIndex]);
    }

    const getSound = () => {
        let quote = document.getElementsByClassName("content").innerHTML;
        let author = document.getElementsByClassName("card-title").innerHTML;
        if (quote != 'No text') {
            let utterance
            if (author != 'No author') {
                utterance = new SpeechSynthesisUtterance(`${randomQuotes.text} by ${randomQuotes.author}`);
            }
            else {
                utterance = new SpeechSynthesisUtterance(`${randomQuotes.text}`);
            }
            synth.speak(utterance);
            setInterval(() => {
                !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
            }, 10);
        }
    }

    const copyFeature = () => {
        navigator.clipboard.writeText(randomQuotes.text);
    }

    return (
        <div className="d-flex align-items-center flex-column pt-5" style={{ backgroundColor: color, minHeight: "100vh" }} >
            <div className="container text-center" id="quote-box">
                <div className="card shadow">
                    <div className="card-header border-bottom-0"><h5>Quote of the day</h5></div>
                    <div className="card-body">
                        {randomQuotes ? <>
                            <h5 className="card-title" id="author">-
                                {(randomQuotes.author != null) ? randomQuotes.author : 'No author'}-
                            </h5>
                            <p className="card-text content" id="text">&quot;{
                                randomQuotes.text || 'No text'
                            }&quot;</p>
                        </> : <h2>Loading</h2>}

                        <div className="row justify-content-between">
                            <button className="btn btn-primary" onClick={getNewQuote} id="new-quote">New quote
                            </button>
                            <div className="button-features">
                                <div className="button-wrap"><a id="tweet-quote" target="_blank" href={`https://twitter.com/intent/tweet?text=${randomQuotes.text}` }
                                    
                                    rel="noreferrer"><i class="fa-brands fa-twitter"></i></a></div>
                                <div className="button-wrap" id="button"><li className="speech button-component rounded-circle" onClick={getSound}><i className="fa-solid fa-volume-high"></i></li></div>
                                <div className="button-wrap"><li className="copy button-component rounded-circle" onClick={copyFeature}><i className="fa-solid fa-copy"></i></li></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));
{
    quotes.map((quote) => <div className="con">{quote.text}</div>);
}
