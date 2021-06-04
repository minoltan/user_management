import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Storage } from 'src/app/Enums/Storage';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem(Storage.TOKEN) != null || localStorage.getItem(Storage.TOKEN) != undefined) {
            return true;
        }

        this.router.navigate(['/dashboard/login']);
        return false;
    }
}