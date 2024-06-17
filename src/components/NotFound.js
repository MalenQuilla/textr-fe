export function NotFound({padding}) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            padding: `${padding}%`
        }}>
            <h4>Oops! There is nothing here...</h4>
        </div>
    );
}