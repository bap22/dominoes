import Head from 'next/head';
import dynamic from 'next/dynamic';

const Dominoes = dynamic(() => import('../components/Dominoes'), {
    ssr: false,
});
const SmackTalk = dynamic(() => import('../components/SmackTalk'), {
    ssr: false,
});

export default function Home() {
    return (
        <>
            <Head>
                <title>Dominoes v1.0</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <board>
                    <h1 className="title">Caribbean Dominoes</h1>
                    <Dominoes />
                </board>

                <chat className="smack">
                    <h4 className="chatTitle">Smack Talk</h4>
                    <SmackTalk />
                </chat>

                <style jsx>{`
                    .container {
                        display: flex;
                        min-height: 100vh;
                    }
                    board {
                        width: calc(100% - 300px);
                        height: 100vh;
                        flex-basis: calc(100% - 300px);
                    }
                    .smack {
                        display: grid;
                        grid-template-rows: 2fr 100px;
                        min-height: 100vh;
                        background-color: #eee;
                        margin: 24px;
                    }

                    chat {
                        display: grid;
                        grid-template-rows: auto;
                        width: calc(100% - 40px);
                        max-width: 300px;
                        margin: 20px auto;
                        border-radius: 10px;
                        overflow: hidden;
                        box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.2);
                        background-color: white;
                    }

                    .chatTitle {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100px;
                        margin: 0;
                        color: white;
                        background: #005c97;
                        background: -webkit-linear-gradient(
                            to right,
                            #363795,
                            #005c97
                        );
                        background: linear-gradient(to right, #363795, #005c97);
                    }

                    @media (min-width: 600px) {
                    }
                `}</style>

                <style jsx global>{`
                    html,
                    body {
                        padding: 0;
                        margin: 0;
                        font-family: Helvetica Neue, sans-serif;
                    }

                    * {
                        box-sizing: border-box;
                    }

                    [data-author='me'] {
                        background: linear-gradient(
                            to right,
                            #363795,
                            #005c97
                        ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                        color: white;
                        align-self: flex-end;
                        border-bottom-right-radius: 0 !important;
                        border-bottom-left-radius: 10px !important;
                    }

                    footer {
                        display: flex;
                        text-align: center;
                        justify-content: center;
                        align-items: center;
                        flex-wrap: wrap;
                        width: 100vw;
                        height: 100px;
                    }
                `}</style>
            </div>
            <footer>&copy; 2022 Brett Peterson</footer>
        </>
    );
}
