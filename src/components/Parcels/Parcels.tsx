import React from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const MyComponent = () => {
    const url = 'http://85.92.111.100/testbase/hs/parcelcloud/parcels/get';
    const data = {
        authToken: {
            userKey: '000000006',
            token: '65c366b209cddb0d84f0642ebb22e546'
        },
        filters: {
            recCities: null,
            sendCities: null,
            number: null
        }
    };

    const mutation = useMutation({
        mutationFn: () =>
            axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
    });

    const handleSubmit = () => {
        mutation.mutate();
    };

    return (
        <div>
            <h1>Накладные</h1>
            <button onClick={handleSubmit} disabled={mutation.isPending}>
                {mutation.isPending ? 'Ожидаем...' : 'Запросить накладные'}
            </button>

            {mutation.isError && <div>Error: {mutation.error.message}</div>}

            {mutation.isSuccess && (
                <div>
                    <h2>Список накладных:</h2>
                    <pre>{JSON.stringify(mutation.data.data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default MyComponent;