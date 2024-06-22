import React from 'react'
import "./Styles.css"

export default function About({text}) {
    return (
        <>
            <div className="page-container">
                <h2>{text}</h2>
            </div>
        </>

    )
}
