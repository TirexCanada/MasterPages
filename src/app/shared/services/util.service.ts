import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';

@Injectable()
export class UtilService {
    tempObj: any;
    public window: Window;
    constructor(public windowRef: WindowRefService) {
        this.window = this.windowRef.nativeWindow;
    }


  /*   getUUID() {
        const h = n => {
            return (n | 0).toString(16);
        };
        const s = n => {
            return h((Math.random() * (1 << (n << 2))) ^ Date.now()).slice(-n);
        };
        return [
            s(4) + s(4), s(4),
            '4' + s(3),                    // UUID version 4
            h(8 | (Math.random() * 4)) + s(3), // {8|9|A|B}xxx
            Date.now().toString(16).slice(-10) + s(2) // Use timestamp to avoid collisions
        ].join('-');
    } */

    isTablet() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.window.navigator.userAgent);
    }

   /*  get(obj, path) {
        this.tempObj = {};
        let value = null;

        path = path.split('.');
        path.forEach((key, index) => {
            if (obj[key] && !this.tempObj[key] && (index < path.length - 1)) {
                this.tempObj = obj[key];
            }
            if (index === path.length - 1) {
                value = this.tempObj.verification[key];
            }
        });
        return value;
    } */

  /*   uniq(xs) {
        let seen = {};
        return xs.filter(function (x) {
            if (seen[x]) {
                return;
            }
            seen[x] = true;
            return x;
        });
    } */

   /*  remove(list: any[], callback) {
        let result = [];
        list.forEach((item, index) => {
            if (!callback(item, index)) {
                result.push(item);
            }
        });
        return result;
    } */

    intersection(array1: any[], array2: any[]) {
        return array1.filter(value => -1 !== array2.indexOf(value));
    }

    /* camelCase = function (str) {
        return str
            .replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
            .replace(/\s/g, '')
            .replace(/^(.)/, function ($1) { return $1.toLowerCase(); });
    }

    lowerFirst(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    } */

    toPath(strPath: string) {
        return strPath.split('.');
    }

   /*  isEmptyObject(obj) {
        if (obj === undefined || obj === null) {
            return true;
        }
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    } */

    getAbsoluteUrlByRelativePath(base: string, relative: string) {
        let stack = base.split("/");
        let parts = relative.split("/");
        stack.pop();
        for (var i = 0; i < parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
}
