"use client"

import { ChangeEvent, useState } from 'react'
import { readFile } from '@/lib/csv_reader';

export function Uploader() {
    const [file, setFile] = useState<File | null>(null);


    const handleFileChange = (e: ChangeEvent) => {
        let selectedFile = (e.target as HTMLInputElement).files
        if (selectedFile) {
            setFile(selectedFile[0]);
        }

    };

    const handleUpload = async () => {
        const buffer = await file?.arrayBuffer()
        if (!buffer) return
        const parser = await readFile(buffer)
        for await (const record of parser) {
            const data = ({
                pergunta: record[0],
                resposta: record[1],
                baralhoId: 'clqflp6fo0001py9of0c96ns0'
            })
            await fetch('http://localhost:3000/api/cartas/create', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }


    };

    return (
        <div className='flex gap-4'>
            <input type="file" onChange={handleFileChange} />
            <button className='bg-neutral-800 text-white px-4 py-1' onClick={handleUpload}>Enviar</button>
        </div>
    );
};

