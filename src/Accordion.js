import React, { useState } from 'react';

function Accordion({ questions }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    let splitAnswers = "";
    return (
        <div className='accordion-container'>

            {questions && questions.map((question, index) => {
                splitAnswers = question.answer.split("\n\n");
                return (
                    <div key={index} className="accordion-item">
                        <div
                            className={`accordion-title ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => toggleAccordion(index)}
                            data-testid={`accordion-title-${index}`}
                        >
                            <h5>{question.question}</h5>
                            <i className="fa fa-chevron-down rc-accordion-icon"></i>
                        </div>
                        <div className={`accordion-content ${index === activeIndex ? 'active' : ''}`} data-testid={`accordion-content-${index}`}>
                            {
                                splitAnswers.map((item, index) => {
                                    return <p key={index}>{item}</p>
                                })
                            }

                        </div>
                    </div>)
            })}
        </div>
    );
}

export default Accordion;
