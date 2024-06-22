import React from 'react'
import "./Home.css"

export default function Home(props) {
    return (
        <>
            <div className="home-page-container">
            <section className="banner"></section>
                <h2>{props.text}</h2>
                <a href="https://facebook.com" target='_blank' rel="noreferrer" >valami</a>
            </div>
        </>

    )
}
