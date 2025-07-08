import colors from "colors";
import server from "./server";

const port = Number(process.env.PORT) || 4000

server.listen(port, '0.0.0.0', () => {
    console.log(colors.cyan.bold( `API running on port: ${port}`))
})