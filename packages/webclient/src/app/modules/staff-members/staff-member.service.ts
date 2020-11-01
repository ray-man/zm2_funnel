import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class StaffMemberService {
  constructor(private readonly http: HttpClient) {}

  public getStaffMembers(filters = {}) {
    return this.http.get<any>("/api/staff-members", { params: filters });
  }
}
