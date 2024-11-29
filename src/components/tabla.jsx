
import { Card, Typography } from "@material-tailwind/react";

const Tabla = ({ mejorRango }) => {

    const TABLE_HEAD = ["Dia", "Iluminacion", "Humedad del suelo", "Humedad del aire", "Temperatura"];

    return (

        <Card className="h-full w-full">
            <table className="w-full min-w-max table-auto text-left mt-8">
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
                    {mejorRango.map(({ day, avg_iluminacion, avg_humedad_suelo, avg_humedad_aire, avg_temp }, index) => {
                        const isLast = index === mejorRango.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={"key:" + index}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {day}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {`${avg_iluminacion} %`}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {`${avg_humedad_suelo} %`}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {`${avg_humedad_aire} %`}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        as="a"
                                        href="#"
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {`${avg_temp} °C`}
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