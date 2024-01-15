import formatarData from '@/components/FormatDate';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
import { useEffect, useRef, useState } from "react";

interface ListingItem {
    name: string;
    level: number;
    sd: number;
    mean: number;
    date: string;
    value: number;
}

interface ListingCollection extends Array<ListingItem> {
}


export default function getLineCharts() {

    const defaultDate = new Date()

    const { width, height } = useWindowDimensions();

    const actualYear = defaultDate.getFullYear()
    const actualDay = defaultDate.getDate() + 1
    const actualMonth = defaultDate.getMonth() + 1

    const [testName, setTestName] = useState<string>('ALB2')
    const [testLevel, setTestLevel] = useState<number>(1)

    const [initialMonth, setInitialMonth] = useState<number>(actualMonth)
    const [secondMonth, setSecondMonth] = useState<number>(actualMonth)

    const [initialDay, setInitialDay] = useState<number>(actualDay - actualDay + 1)
    const [secondDay, setSecondDay] = useState<number>(actualDay)

    const [initialYear, setInitialYear] = useState<number>(actualYear)
    const [secondYear, setSecondYear] = useState<number>(actualYear)    

    const baseUrl = "http://localhost:8080/analytics/getAllResultsByDate/"
    const url = `${baseUrl}${testName}/${testLevel}/${initialYear}-${initialMonth}-${initialDay}/${secondYear}-${secondMonth}-${secondDay}?`;

    const fakeData = [
        {
            "id": 4274,
            "date": "2024-01-01 08:11:30",
            "level_lot": "0774693",
            "test_lot": "598376",
            "name": "MG-2",
            "level": "PCCC1",
            "value": 1.96,
            "mean": 1.91,
            "sd": 0.08,
            "unit_value": "mg/dL",
            "rules": "Average",
            "description": "Approved"
        },
        {
            "id": 4331,
            "date": "2024-01-02 09:28:15",
            "level_lot": "0774693",
            "test_lot": "598376",
            "name": "MG-2",
            "level": "PCCC1",
            "value": 1.93,
            "mean": 1.91,
            "sd": 0.08,
            "unit_value": "mg/dL",
            "rules": "Average",
            "description": "Approved"
        },
        {
            "id": 4388,
            "date": "2024-01-03 08:38:50",
            "level_lot": "0774693",
            "test_lot": "598376",
            "name": "MG-2",
            "level": "PCCC1",
            "value": 2.01,
            "mean": 1.91,
            "sd": 0.08,
            "unit_value": "mg/dL",
            "rules": "+1s",
            "description": "Approved"
        },
        {
            "id": 4439,
            "date": "2024-01-04 08:10:48",
            "level_lot": "0774693",
            "test_lot": "598376",
            "name": "MG-2",
            "level": "PCCC1",
            "value": 2.01,
            "mean": 1.91,
            "sd": 0.08,
            "unit_value": "mg/dL",
            "rules": "+1s",
            "description": "Approved"
        },
        {
            "id": 4492,
            "date": "2024-01-05 08:26:17",
            "level_lot": "0774693",
            "test_lot": "598376",
            "name": "MG-2",
            "level": "PCCC1",
            "value": 2.01,
            "mean": 1.91,
            "sd": 0.08,
            "unit_value": "mg/dL",
            "rules": "+1s",
            "description": "Approved"
        },
        {
            "id": 4548,
            "date": "2024-01-06 08:32:17",
            "level_lot": "0774693",
            "test_lot": "598376",
            "name": "MG-2",
            "level": "PCCC1",
            "value": 2.14,
            "mean": 1.91,
            "sd": 0.08,
            "unit_value": "mg/dL",
            "rules": "+2s",
            "description": "Approved"
        },
        {
            "id": 4546,
            "date": "2024-01-06 10:33:00",
            "level_lot": "0774693",
            "test_lot": "598376",
            "name": "MG-2",
            "level": "PCCC1",
            "value": 2.01,
            "mean": 1.91,
            "sd": 0.08,
            "unit_value": "mg/dL",
            "rules": "+1s",
            "description": "Approved"
        },
        {
            "id": 4599,
            "date": "2024-01-07 09:33:49",
            "level_lot": "0774693",
            "test_lot": "598376",
            "name": "MG-2",
            "level": "PCCC1",
            "value": 2.01,
            "mean": 1.91,
            "sd": 0.08,
            "unit_value": "mg/dL",
            "rules": "+1s",
            "description": "Approved"
        },
        {
            "id": 4658,
            "date": "2024-01-08 08:19:00",
            "level_lot": "0774693",
            "test_lot": "598376",
            "name": "MG-2",
            "level": "PCCC1",
            "value": 1.95,
            "mean": 1.91,
            "sd": 0.08,
            "unit_value": "mg/dL",
            "rules": "Average",
            "description": "Approved"
        },
        {
            "id": 4712,
            "date": "2024-01-09 08:55:56",
            "level_lot": "0774693",
            "test_lot": "598376",
            "name": "MG-2",
            "level": "PCCC1",
            "value": 2.04,
            "mean": 1.91,
            "sd": 0.08,
            "unit_value": "mg/dL",
            "rules": "+1s",
            "description": "Approved"
        },
        {
            "id": 4766,
            "date": "2024-01-10 07:47:49",
            "level_lot": "0774693",
            "test_lot": "598376",
            "name": "MG-2",
            "level": "PCCC1",
            "value": 1.99,
            "mean": 1.91,
            "sd": 0.08,
            "unit_value": "mg/dL",
            "rules": "Average",
            "description": "Approved"
        },
        {
            "id": 4820,
            "date": "2024-01-11 08:23:14",
            "level_lot": "0774693",
            "test_lot": "598376",
            "name": "MG-2",
            "level": "PCCC1",
            "value": 2,
            "mean": 1.91,
            "sd": 0.08,
            "unit_value": "mg/dL",
            "rules": "+1s",
            "description": "Approved"
        },
        {
            "id": 4873,
            "date": "2024-01-12 08:45:43",
            "level_lot": "0774693",
            "test_lot": "598376",
            "name": "MG-2",
            "level": "PCCC1",
            "value": 1.9,
            "mean": 1.91,
            "sd": 0.08,
            "unit_value": "mg/dL",
            "rules": "Average",
            "description": "Approved"
        }
    ]

    var [Listing, setListing] = useState<any>([]);

    useEffect(() => {
        var fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });


                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const json = await response.json();
                setListing(json);

                if (!Listing.length) {
                    setInitialYear(actualYear)
                    setInitialMonth(actualMonth)
                    setInitialDay(1)

                    setSecondYear(actualYear)
                    setSecondMonth(actualMonth)
                    setSecondDay(actualDay)
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [testName, testLevel]);

    var data: ListingCollection = Listing;
    //use fake data for tests ---> 
    //var data: any = fakeData
    if (Listing.length) {

        const dates = data.map((entry: { date: string }) => formatarData(entry.date));
        const values = data.map((entry: { value: number }) => entry.value);
        const mean = data[0].mean;
        const sd = data[0].sd;
        const name = data[0].name
        const level = data[0].level

        const yaxisRange = [mean - (3 * 1.2) * sd, mean + (3 * 1.2) * sd];
        const yTickValues = [mean - 3 * sd, mean - 2 * sd, mean - sd, mean, mean + sd, mean + 2 * sd, mean + 3 * sd];
        const yTickText = ['-3s ', '-2s ', '-1s ', 'Média ', '+1s ', '+2s ', '+3s '];

        var plotData: any = [{
            x: dates,
            y: values,
            type: 'scatter',
            mode: 'lines+markers+text',
            text: values.map((value: number) => value.toFixed(2)),
            textposition: 'top center',
            textfont: { size: 12, color: 'rgb(229 231 235);' },
            marker: { color: 'rgb(87, 87, 255)' },
            name: 'Valores',
        }];

        const lines = [
            { multiple: 3, color: 'red', legend: '3x SD' },
            { multiple: 2, color: 'brown', legend: '2x SD' },
            { multiple: 1, color: 'orange', legend: '1x SD' },
            { multiple: 0, color: 'green', legend: 'mean' },
            { multiple: -1, color: 'orange', legend: '-1x SD' },
            { multiple: -2, color: 'brown', legend: '-2x SD' },
            { multiple: -3, color: 'red', legend: '-3x SD' },
        ];

        const shapes = lines.map(line => ({
            type: 'line',
            xref: 'paper',
            x0: 0,
            x1: 1,
            yref: 'y',
            y0: mean + line.multiple * sd,
            y1: mean + line.multiple * sd,
            line: { color: line.color, width: 1, dash: 'dash' },
            name: line.legend,
        }));


        var layout: any = {
            width: width,
            height: height,
            plot_bgcolor: 'rgb(38 38 38)',
            paper_bgcolor: 'rgb(38 38 38)',
            color: "rgb(229 231 235);",
            font: { family: 'monospace', size: 18, color: 'rgb(229 231 235);' },
            title: name,
            scale: 1,
            showgrid: true,
            gridwidth: 1,
            gridcolor: 'rgb(229 231 235);',
            responsive: true,
            showlegend: false,
            displayModeBar: false,
            xanchor: 'center',
            yanchor: 'center',
            margin: {
                pad: 5
            },
            xaxis: {
                title: {

                },
                tickangle: -20,
                type: 'category',
                color: 'rgb(229 231 235);',
                tickfont: {
                    size: 12,
                },
            },
            yaxis: {
                title: '', range: yaxisRange, color: "rgb(229 231 235);",
                tickvals: yTickValues,
                ticktext: yTickText,
                tickfont: {
                    size: 14
                },
            },
            shapes: shapes,
            annotations: [
                {
                    text: level,
                    showarrow: false,
                    xref: 'paper',
                    yref: 'paper',
                    x: 0,
                    y: 1.05,
                    xanchor: 'left',
                    yanchor: 'bottom',
                    font: {
                        size: 14,
                        color: 'rgb(229 231 235);',
                    },
                },
            ],
        };
    }

    return (
        <div className='h-screen w-screen flex flex-col items-center justify-center text-center justify-items-center bg-neutral-800'>
            <div className='flex justify-center items-center mb-2 gap-2'>
                <div className=' flex justify-center items-center text-gray-100 text-sm text-center gap-1'>
                    De:
                    <select
                        className='bg-neutral-700 text-gray-200 rounded-lg shadow-lg text-sm p-1'
                        value={initialDay}
                        onChange={(z) => {
                            setInitialDay(+z.target.value);
                        }}
                    >
                        {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                    <select className='bg-neutral-700 text-gray-200 rounded-lg shadow-lg  text-sm p-1'
                        value={initialMonth}
                        onChange={(s) => {
                            setInitialMonth(+s.target.value);
                        }}
                    >
                        <option value={1}>Janeiro</option>
                        <option value={2}>Fevereiro</option>
                        <option value={3}>Março</option>
                        <option value={4}>Abril</option>
                        <option value={5}>Maio</option>
                        <option value={6}>Junho</option>
                        <option value={7}>Julho</option>
                        <option value={8}>Agosto</option>
                        <option value={9}>Setembro</option>
                        <option value={10}>Outubro</option>
                        <option value={11}>Novembro</option>
                        <option value={12}>Dezembro</option>
                    </select>
                    <select className='bg-neutral-700 text-gray-200 rounded-lg shadow-lg  text-sm p-1'
                        value={initialYear}
                        onChange={(r) => {
                            setInitialYear(+r.target.value);
                        }}
                    >
                        <option value={2023}>2023</option>
                        <option value={2024}>2024</option>
                    </select>

                    Até:
                    <select
                        className='bg-neutral-700 text-gray-200 rounded-lg shadow-lg  text-sm p-1'
                        value={secondDay}
                        onChange={(w) => {
                            setSecondDay(+w.target.value);
                        }}
                    >
                        {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                            <option key={day} value={day + 1}>
                                {day}
                            </option>
                        ))}
                    </select>
                    <select className='bg-neutral-700 text-gray-200 rounded-lg shadow-lg  text-sm p-1'
                        value={secondMonth}
                        onChange={(v) => {
                            setSecondMonth(+v.target.value);
                        }}
                    >
                        <option value={1}>Janeiro</option>
                        <option value={2}>Fevereiro</option>
                        <option value={3}>Março</option>
                        <option value={4}>Abril</option>
                        <option value={5}>Maio</option>
                        <option value={6}>Junho</option>
                        <option value={7}>Julho</option>
                        <option value={8}>Agosto</option>
                        <option value={9}>Setembro</option>
                        <option value={10}>Outubro</option>
                        <option value={11}>Novembro</option>
                        <option value={12}>Dezembro</option>
                    </select>
                    <select className='bg-neutral-700 text-gray-200 rounded-lg shadow-lg  text-sm p-1'
                        value={secondYear}
                        onChange={(u) => {
                            setSecondYear(+u.target.value);
                        }}
                    >
                        <option value={2023}>2023</option>
                        <option value={2024}>2024</option>
                    </select>
                </div>
                <div className='flex justify-center items-center text-gray-200 text-sm text-center gap-1'>
                    Analíto:
                    <select className='bg-neutral-700 text-gray-200 rounded-lg shadow-lg  text-sm p-1'
                        value={testName}
                        onChange={(e) => {
                            setTestName(e.target.value);
                        }}
                    >
                        <option value="ALB2">ALB2</option>
                        <option value="ALP2S">ALP2S</option>
                        <option value="ALTL">ALTL</option>
                        <option value="AMYL2">AMYL2</option>
                        <option value="ASTL">ASTL</option>
                        <option value="BILD2">BILD2</option>
                        <option value="BILT3">BILT3</option>
                        <option value="CA2">CA2</option>
                        <option value="CHOL2">CHOL2</option>
                        <option value="CK2">CK2</option>
                        <option value="CKMB2">CKMB2</option>
                        <option value="CL-I">CL-I</option>
                        <option value="CREJ2">CREJ2</option>
                        <option value="CRP4">CRP4</option>
                        <option value="GGTI2">GGTI2</option>
                        <option value="GLUC3">GLUC3</option>
                        <option value="HDLC4">HDLC4</option>
                        <option value="K-I">K-I</option>
                        <option value="LDHI2">LDHI2</option>
                        <option value="LIP">LIP</option>
                        <option value="MG-2">MG-2</option>
                        <option value="NA-I">NA-I</option>
                        <option value="PHOS2">PHOS2</option>
                        <option value="TRIGL">TRIGL</option>
                        <option value="UA2">UA2</option>
                        <option value="UREL">UREL</option>
                    </select>
                    Nível:
                    <select className='bg-neutral-700 text-gray-200 rounded-lg shadow-lg  text-sm p-1'
                        value={testLevel}
                        onChange={(p) => {
                            setTestLevel(+p.target.value);
                        }}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                    </select>
                    Validar:
                    <Link className='bg-neutral-700 hover:bg-gray-400 text-gray-200 text-base px-2 rounded-lg shadow-lg' target="_blank"
                        href=
                        {'https://docs.google.com/spreadsheets/d/1afb6XMe-CAg1yKednEugp3W8v6AMy5QJMzHzeoHRRRg/edit?userstoinvite=andersongomesbio@gmail.com&sharingaction=manageaccess&role=writer&pli=1#gid=1397277322'}
                    >&#10003;
                    </Link>
                </div>
            </div>
            <Head>
                <title>LabGraph</title>
            </Head>
            <div className="flex flex-col justify-center items-center w-screen ">
                <span className='border-solid border-neutral-500 border-2 p-2 bg-neutral-800 rounded-xl'>
                    <Plot
                        data={plotData}
                        layout={layout}
                    />
                </span>
            </div>
        </div>
    )
}