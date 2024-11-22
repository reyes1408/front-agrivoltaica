
import { Card, Typography } from "@material-tailwind/react";

const Tabla = () => {

    const TABLE_HEAD = ["Parcela", "Humedad de suelo", "Luminosidad", "Temperatura", "Humedad del aire", "Fecha"];

    const TABLE_ROWS = [
        {
            parcela: "Parcela 1", 
            humedad_Suelo: "32%",
            luminosidad: "45000 lx",
            temperatura: "30° C",
            humedad_Aire: "40%",
            fecha: "23/04/18",
        },
        {
            parcela: "Parcela 1", 
            humedad_Suelo: "32%",
            luminosidad: "45000 lx",
            temperatura: "30° C",
            humedad_Aire: "40%",
            fecha: "23/04/18",
        },
        {
            parcela: "Parcela 1", 
            humedad_Suelo: "32%",
            luminosidad: "45000 lx",
            temperatura: "30° C",
            humedad_Aire: "40%",
            fecha: "23/04/18",
        },
        {
            parcela: "Parcela 1", 
            humedad_Suelo: "32%",
            luminosidad: "45000 lx",
            temperatura: "30° C",
            humedad_Aire: "40%",
            fecha: "23/04/18",
        },
        {
            parcela: "Parcela 1", 
            humedad_Suelo: "32%",
            luminosidad: "45000 lx",
            temperatura: "30° C",
            humedad_Aire: "40%",
            fecha: "23/04/18",
        },
        {
            parcela: "Parcela 1", 
            humedad_Suelo: "32%",
            luminosidad: "45000 lx",
            temperatura: "30° C",
            humedad_Aire: "40%",
            fecha: "23/04/18",
        },
    ];

    return (

        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map(({ parcela, humedad_Suelo, luminosidad, temperatura, humedad_Aire, fecha }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={parcela + index}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {parcela}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {humedad_Suelo}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {luminosidad}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium"
                                    >
                                        {temperatura}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium"
                                    >
                                        {humedad_Aire}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium"
                                    >
                                        {fecha}
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    );
}

export default Tabla