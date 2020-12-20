import { BaseApiResponse } from '@interface/BaseApiResponse';

export function makeApiCall<T = any>(props: {
    url: string;
    method?: string;
    bodyParams?: any;
    searchParams?: any;
    headers?: any;
    timeout?: number;
}): Promise<BaseApiResponse<T>> {
    const params: RequestInit = {
        method: props.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(props.headers ?? {}),
        },
    };

    if (typeof AbortController !== "undefined") {
        const controller = new AbortController();
        const signal = controller.signal;
        setTimeout(() => controller.abort(), props.timeout || 10000);
        params.signal = signal;
    }

    if (
        ["post", "delete", "put"].indexOf(
            params.method?.toLowerCase() ?? ""
        ) !== -1
    ) {
        params.body = JSON.stringify(props.bodyParams || {});
    }
    return fetch(props.url, params).then((res) => res.json());
}