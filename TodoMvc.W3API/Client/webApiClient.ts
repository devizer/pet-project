﻿/* tslint:disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v10.1.6309.31527 (NJsonSchema v8.30.6304.31883) (http://NSwag.org)
// </auto-generated>
//----------------------

import * as ng from 'angular';

module todoClient {
namespace todoClient {

export class ListsClient {
    private baseUrl: string = undefined; 
    private http: ng.IHttpService; 
    private q: ng.IQService; 
    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    constructor($http: ng.IHttpService, $q: ng.IQService, baseUrl?: string) {
        this.http = $http;
        this.q = $q;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    add(title: string): ng.IPromise<void> {
        let url_ = this.baseUrl + "/api/v1/lists?";
        if (title === undefined)
            throw new Error("The parameter 'title' must be defined.");
        else
            url_ += "title=" + encodeURIComponent("" + title) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = "";

        var options_ = <ng.IRequestConfig>{
            url: url_,
            method: "PUT",
            data: content_,
            transformResponse: [], 
            headers: {
                "Content-Type": "application/json; charset=UTF-8", 
                "Accept": "application/json; charset=UTF-8"
            }
        };

        return this.http(options_).then((_response) => {
            return this.processAdd(_response);
        }, (_response) => {
            if (_response.status)
                return this.processAdd(_response);
            throw _response;
        });
    }

    protected processAdd(_response: any): ng.IPromise<void> {
        const _status = _response.status; 

        if (_status === 400) {
            const _responseText = _response.data;
            return throwException(this.q, "A server error occurred.", _status, _responseText);
        } else if (_status !== 200 && _status !== 204) {
            const _responseText = _response.data;
            return throwException(this.q, "An unexpected server error occurred.", _status, _responseText);
        }
        return this.q.resolve(null);
    }

    getAll(): ng.IPromise<TodoList[]> {
        let url_ = this.baseUrl + "/api/v1/lists";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = "";

        var options_ = <ng.IRequestConfig>{
            url: url_,
            method: "GET",
            data: content_,
            transformResponse: [], 
            headers: {
                "Content-Type": "application/json; charset=UTF-8", 
                "Accept": "application/json; charset=UTF-8"
            }
        };

        return this.http(options_).then((_response) => {
            return this.processGetAll(_response);
        }, (_response) => {
            if (_response.status)
                return this.processGetAll(_response);
            throw _response;
        });
    }

    protected processGetAll(_response: any): ng.IPromise<TodoList[]> {
        const _status = _response.status; 

        if (_status === 200) {
            const _responseText = _response.data;
            let result200: TodoList[] = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(TodoList.fromJS(item));
            }
            return this.q.resolve(result200);
        } else if (_status !== 200 && _status !== 204) {
            const _responseText = _response.data;
            return throwException(this.q, "An unexpected server error occurred.", _status, _responseText);
        }
        return this.q.resolve(null);
    }

    delete(idList: number): ng.IPromise<void> {
        let url_ = this.baseUrl + "/api/v1/lists/{idList}";
        if (idList === undefined || idList === null)
            throw new Error("The parameter 'idList' must be defined.");
        url_ = url_.replace("{idList}", encodeURIComponent("" + idList)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = "";

        var options_ = <ng.IRequestConfig>{
            url: url_,
            method: "DELETE",
            data: content_,
            transformResponse: [], 
            headers: {
                "Content-Type": "application/json; charset=UTF-8", 
                "Accept": "application/json; charset=UTF-8"
            }
        };

        return this.http(options_).then((_response) => {
            return this.processDelete(_response);
        }, (_response) => {
            if (_response.status)
                return this.processDelete(_response);
            throw _response;
        });
    }

    protected processDelete(_response: any): ng.IPromise<void> {
        const _status = _response.status; 

        if (_status === 404) {
            const _responseText = _response.data;
            return throwException(this.q, "A server error occurred.", _status, _responseText);
        } else if (_status !== 200 && _status !== 204) {
            const _responseText = _response.data;
            return throwException(this.q, "An unexpected server error occurred.", _status, _responseText);
        }
        return this.q.resolve(null);
    }

    update(idList: number, title: string): ng.IPromise<void> {
        let url_ = this.baseUrl + "/api/v1/lists/{idList}/title?";
        if (idList === undefined || idList === null)
            throw new Error("The parameter 'idList' must be defined.");
        url_ = url_.replace("{idList}", encodeURIComponent("" + idList)); 
        if (title === undefined)
            throw new Error("The parameter 'title' must be defined.");
        else
            url_ += "title=" + encodeURIComponent("" + title) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = "";

        var options_ = <ng.IRequestConfig>{
            url: url_,
            method: "POST",
            data: content_,
            transformResponse: [], 
            headers: {
                "Content-Type": "application/json; charset=UTF-8", 
                "Accept": "application/json; charset=UTF-8"
            }
        };

        return this.http(options_).then((_response) => {
            return this.processUpdate(_response);
        }, (_response) => {
            if (_response.status)
                return this.processUpdate(_response);
            throw _response;
        });
    }

    protected processUpdate(_response: any): ng.IPromise<void> {
        const _status = _response.status; 

        if (_status === 404) {
            const _responseText = _response.data;
            return throwException(this.q, "A server error occurred.", _status, _responseText);
        } else if (_status === 400) {
            const _responseText = _response.data;
            return throwException(this.q, "A server error occurred.", _status, _responseText);
        } else if (_status !== 200 && _status !== 204) {
            const _responseText = _response.data;
            return throwException(this.q, "An unexpected server error occurred.", _status, _responseText);
        }
        return this.q.resolve(null);
    }
}

export class SystemClient {
    private baseUrl: string = undefined; 
    private http: ng.IHttpService; 
    private q: ng.IQService; 
    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    constructor($http: ng.IHttpService, $q: ng.IQService, baseUrl?: string) {
        this.http = $http;
        this.q = $q;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getBuildInfo(): ng.IPromise<string> {
        let url_ = this.baseUrl + "/api/v1/system/build-info";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = "";

        var options_ = <ng.IRequestConfig>{
            url: url_,
            method: "GET",
            data: content_,
            transformResponse: [], 
            headers: {
                "Content-Type": "application/json; charset=UTF-8", 
                "Accept": "application/json; charset=UTF-8"
            }
        };

        return this.http(options_).then((_response) => {
            return this.processGetBuildInfo(_response);
        }, (_response) => {
            if (_response.status)
                return this.processGetBuildInfo(_response);
            throw _response;
        });
    }

    protected processGetBuildInfo(_response: any): ng.IPromise<string> {
        const _status = _response.status; 

        if (_status === 200) {
            const _responseText = _response.data;
            let result200: string = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return this.q.resolve(result200);
        } else if (_status !== 200 && _status !== 204) {
            const _responseText = _response.data;
            return throwException(this.q, "An unexpected server error occurred.", _status, _responseText);
        }
        return this.q.resolve(null);
    }

    getBuildInfo2(): ng.IPromise<string> {
        let url_ = this.baseUrl + "/api/v1/system/build-info";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = "";

        var options_ = <ng.IRequestConfig>{
            url: url_,
            method: "POST",
            data: content_,
            transformResponse: [], 
            headers: {
                "Content-Type": "application/json; charset=UTF-8", 
                "Accept": "application/json; charset=UTF-8"
            }
        };

        return this.http(options_).then((_response) => {
            return this.processGetBuildInfo2(_response);
        }, (_response) => {
            if (_response.status)
                return this.processGetBuildInfo2(_response);
            throw _response;
        });
    }

    protected processGetBuildInfo2(_response: any): ng.IPromise<string> {
        const _status = _response.status; 

        if (_status === 200) {
            const _responseText = _response.data;
            let result200: string = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return this.q.resolve(result200);
        } else if (_status !== 200 && _status !== 204) {
            const _responseText = _response.data;
            return throwException(this.q, "An unexpected server error occurred.", _status, _responseText);
        }
        return this.q.resolve(null);
    }
}

export class TasksClient {
    private baseUrl: string = undefined; 
    private http: ng.IHttpService; 
    private q: ng.IQService; 
    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    constructor($http: ng.IHttpService, $q: ng.IQService, baseUrl?: string) {
        this.http = $http;
        this.q = $q;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    addTask(idList: number, title: string, completed: boolean): ng.IPromise<void> {
        let url_ = this.baseUrl + "/api/v1/lists/{idList}/tasks?";
        if (idList === undefined || idList === null)
            throw new Error("The parameter 'idList' must be defined.");
        url_ = url_.replace("{idList}", encodeURIComponent("" + idList)); 
        if (title === undefined)
            throw new Error("The parameter 'title' must be defined.");
        else
            url_ += "title=" + encodeURIComponent("" + title) + "&"; 
        if (completed === undefined || completed === null)
            throw new Error("The parameter 'completed' must be defined and cannot be null.");
        else
            url_ += "completed=" + encodeURIComponent("" + completed) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = "";

        var options_ = <ng.IRequestConfig>{
            url: url_,
            method: "PUT",
            data: content_,
            transformResponse: [], 
            headers: {
                "Content-Type": "application/json; charset=UTF-8", 
                "Accept": "application/json; charset=UTF-8"
            }
        };

        return this.http(options_).then((_response) => {
            return this.processAddTask(_response);
        }, (_response) => {
            if (_response.status)
                return this.processAddTask(_response);
            throw _response;
        });
    }

    protected processAddTask(_response: any): ng.IPromise<void> {
        const _status = _response.status; 

        if (_status === 404) {
            const _responseText = _response.data;
            return throwException(this.q, "A server error occurred.", _status, _responseText);
        } else if (_status === 400) {
            const _responseText = _response.data;
            return throwException(this.q, "A server error occurred.", _status, _responseText);
        } else if (_status !== 200 && _status !== 204) {
            const _responseText = _response.data;
            return throwException(this.q, "An unexpected server error occurred.", _status, _responseText);
        }
        return this.q.resolve(null);
    }

    deleteTask(idList: number, idTask: number): ng.IPromise<void> {
        let url_ = this.baseUrl + "/api/v1/lists/{idList}/tasks/{idTask}";
        if (idList === undefined || idList === null)
            throw new Error("The parameter 'idList' must be defined.");
        url_ = url_.replace("{idList}", encodeURIComponent("" + idList)); 
        if (idTask === undefined || idTask === null)
            throw new Error("The parameter 'idTask' must be defined.");
        url_ = url_.replace("{idTask}", encodeURIComponent("" + idTask)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = "";

        var options_ = <ng.IRequestConfig>{
            url: url_,
            method: "DELETE",
            data: content_,
            transformResponse: [], 
            headers: {
                "Content-Type": "application/json; charset=UTF-8", 
                "Accept": "application/json; charset=UTF-8"
            }
        };

        return this.http(options_).then((_response) => {
            return this.processDeleteTask(_response);
        }, (_response) => {
            if (_response.status)
                return this.processDeleteTask(_response);
            throw _response;
        });
    }

    protected processDeleteTask(_response: any): ng.IPromise<void> {
        const _status = _response.status; 

        if (_status === 404) {
            const _responseText = _response.data;
            return throwException(this.q, "A server error occurred.", _status, _responseText);
        } else if (_status !== 200 && _status !== 204) {
            const _responseText = _response.data;
            return throwException(this.q, "An unexpected server error occurred.", _status, _responseText);
        }
        return this.q.resolve(null);
    }

    updateTaskTitle(idList: number, idTask: number, title: string): ng.IPromise<void> {
        let url_ = this.baseUrl + "/api/v1/lists/{idList}/tasks/{idTask}/title?";
        if (idList === undefined || idList === null)
            throw new Error("The parameter 'idList' must be defined.");
        url_ = url_.replace("{idList}", encodeURIComponent("" + idList)); 
        if (idTask === undefined || idTask === null)
            throw new Error("The parameter 'idTask' must be defined.");
        url_ = url_.replace("{idTask}", encodeURIComponent("" + idTask)); 
        if (title === undefined)
            throw new Error("The parameter 'title' must be defined.");
        else
            url_ += "title=" + encodeURIComponent("" + title) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = "";

        var options_ = <ng.IRequestConfig>{
            url: url_,
            method: "POST",
            data: content_,
            transformResponse: [], 
            headers: {
                "Content-Type": "application/json; charset=UTF-8", 
                "Accept": "application/json; charset=UTF-8"
            }
        };

        return this.http(options_).then((_response) => {
            return this.processUpdateTaskTitle(_response);
        }, (_response) => {
            if (_response.status)
                return this.processUpdateTaskTitle(_response);
            throw _response;
        });
    }

    protected processUpdateTaskTitle(_response: any): ng.IPromise<void> {
        const _status = _response.status; 

        if (_status === 404) {
            const _responseText = _response.data;
            return throwException(this.q, "A server error occurred.", _status, _responseText);
        } else if (_status === 400) {
            const _responseText = _response.data;
            return throwException(this.q, "A server error occurred.", _status, _responseText);
        } else if (_status !== 200 && _status !== 204) {
            const _responseText = _response.data;
            return throwException(this.q, "An unexpected server error occurred.", _status, _responseText);
        }
        return this.q.resolve(null);
    }

    updateTaskCompleted(idList: number, idTask: number, completed: boolean): ng.IPromise<void> {
        let url_ = this.baseUrl + "/api/v1/lists/{idList}/tasks/{idTask}/completed?";
        if (idList === undefined || idList === null)
            throw new Error("The parameter 'idList' must be defined.");
        url_ = url_.replace("{idList}", encodeURIComponent("" + idList)); 
        if (idTask === undefined || idTask === null)
            throw new Error("The parameter 'idTask' must be defined.");
        url_ = url_.replace("{idTask}", encodeURIComponent("" + idTask)); 
        if (completed === undefined || completed === null)
            throw new Error("The parameter 'completed' must be defined and cannot be null.");
        else
            url_ += "completed=" + encodeURIComponent("" + completed) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = "";

        var options_ = <ng.IRequestConfig>{
            url: url_,
            method: "POST",
            data: content_,
            transformResponse: [], 
            headers: {
                "Content-Type": "application/json; charset=UTF-8", 
                "Accept": "application/json; charset=UTF-8"
            }
        };

        return this.http(options_).then((_response) => {
            return this.processUpdateTaskCompleted(_response);
        }, (_response) => {
            if (_response.status)
                return this.processUpdateTaskCompleted(_response);
            throw _response;
        });
    }

    protected processUpdateTaskCompleted(_response: any): ng.IPromise<void> {
        const _status = _response.status; 

        if (_status === 404) {
            const _responseText = _response.data;
            return throwException(this.q, "A server error occurred.", _status, _responseText);
        } else if (_status !== 200 && _status !== 204) {
            const _responseText = _response.data;
            return throwException(this.q, "An unexpected server error occurred.", _status, _responseText);
        }
        return this.q.resolve(null);
    }
}

export class TodoList implements ITodoList {
    id: number;
    title: string;
    tasks: TodoTask[];

    constructor(data?: ITodoList) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["Id"] !== undefined ? data["Id"] : <any>null;
            this.title = data["Title"] !== undefined ? data["Title"] : <any>null;
            if (data["Tasks"] && data["Tasks"].constructor === Array) {
                this.tasks = [];
                for (let item of data["Tasks"])
                    this.tasks.push(TodoTask.fromJS(item));
            }
        }
    }

    static fromJS(data: any): TodoList {
        let result = new TodoList();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = data ? data : {};
        data["Id"] = this.id !== undefined ? this.id : <any>null;
        data["Title"] = this.title !== undefined ? this.title : <any>null;
        if (this.tasks && this.tasks.constructor === Array) {
            data["Tasks"] = [];
            for (let item of this.tasks)
                data["Tasks"].push(item.toJSON());
        }
        return data; 
    }

    clone() {
        const json = this.toJSON();
        let result = new TodoList();
        result.init(json);
        return result;
    }
}

export interface ITodoList {
    id: number;
    title: string;
    tasks: TodoTask[];
}

export class TodoTask implements ITodoTask {
    id: number;
    title: string;
    completed: boolean;
    idList: number;
    list: TodoList;

    constructor(data?: ITodoTask) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["Id"] !== undefined ? data["Id"] : <any>null;
            this.title = data["Title"] !== undefined ? data["Title"] : <any>null;
            this.completed = data["Completed"] !== undefined ? data["Completed"] : <any>null;
            this.idList = data["IdList"] !== undefined ? data["IdList"] : <any>null;
            this.list = data["List"] ? TodoList.fromJS(data["List"]) : <any>null;
        }
    }

    static fromJS(data: any): TodoTask {
        let result = new TodoTask();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = data ? data : {};
        data["Id"] = this.id !== undefined ? this.id : <any>null;
        data["Title"] = this.title !== undefined ? this.title : <any>null;
        data["Completed"] = this.completed !== undefined ? this.completed : <any>null;
        data["IdList"] = this.idList !== undefined ? this.idList : <any>null;
        data["List"] = this.list ? this.list.toJSON() : <any>null;
        return data; 
    }

    clone() {
        const json = this.toJSON();
        let result = new TodoTask();
        result.init(json);
        return result;
    }
}

export interface ITodoTask {
    id: number;
    title: string;
    completed: boolean;
    idList: number;
    list: TodoList;
}

export class SwaggerException extends Error {
    message: string;
    status: number; 
    response: string; 
    result: any; 

    constructor(message: string, status: number, response: string, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.result = result;
    }
}

function throwException(q: ng.IQService, message: string, status: number, response: string, result?: any): ng.IPromise<any> {
    return q.reject(new SwaggerException(message, status, response, result));
}

function blobToText(blob: Blob, q: ng.IQService): ng.IPromise<string> {
    return new q((resolve) => { 
        let reader = new FileReader(); 
        reader.onload = function() { 
            resolve(this.result);
        }
        reader.readAsText(blob); 
    });
}

}
}