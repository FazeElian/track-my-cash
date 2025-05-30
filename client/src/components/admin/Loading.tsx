import { HashLoader } from "react-spinners"

const Loading = () => {
    return (
        <section
            className="loading"
            style={{
                display: "flex",
                width: "100%",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <HashLoader
                size={80}
                color="#24BF67"
            />
        </section>
    )
}

export default Loading