import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { PaginatedResult } from "../_models/pagination";

// get pagination result
export function getPaginationResult<T>(url, params, http: HttpClient) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return http.get<T>(url, { observe: 'response', params }).pipe(
        map(response => {
            paginatedResult.result = response.body;
            if (response.headers.get("Pagination") !== null) {
                paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
            }
            return paginatedResult;
        })
    );
}

// get the pagination headers
export function getPaginationHeaders(pageNumber?: number, pageSize?: number) {
    let params = new HttpParams();
    if (pageNumber !== null && pageSize !== null) {
        params = params.append("pageNumber", pageNumber.toString());
        params = params.append("pageSize", pageSize.toString());
    }
    return params;
}