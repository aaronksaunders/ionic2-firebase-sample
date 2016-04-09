import {Page} from 'ionic-angular';
import {FirebaseService} from '../../lib/firebaseService'
import {
  OnInit,
  OnDestroy
} from 'angular2/core';

@Page({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit {
    auth: any = {};
    items = [];
    activeUser: String

    constructor(public FBService: FirebaseService) {
        console.log("in constructor");

    }

    ngOnInit() {
        console.log('ngOnInit');
        
        this.FBService.login("c@mail.com")
            .subscribe((data: FirebaseAuthData) => {

                console.log("the data", data.password.email)
                this.activeUser = data.password.email

                this.FBService.getDataObs(data.uid)
                    .subscribe((data: Array<any>) => {
                        console.log(data)
                        this.items = data
                    })
            });
    }
}
