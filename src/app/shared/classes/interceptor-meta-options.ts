export class InterceptorMetaOptions {
    constructor(
      public skipIncerceptor: boolean = false,
      public skipJson: boolean = false,
      public skipAuthorization: boolean = false
    ) { }
  }