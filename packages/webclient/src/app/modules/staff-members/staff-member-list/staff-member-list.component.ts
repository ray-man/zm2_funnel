import { Component, OnInit } from "@angular/core";
import { StaffMemberService } from "../staff-member.service";

@Component({
  selector: "app-staff-member-list",
  templateUrl: "./staff-member-list.component.html",
  styleUrls: ["./staff-member-list.component.scss"],
})
export class StaffMemberListComponent implements OnInit {
  public staffMembers = [];
  public isLoading = true;
  public isError = false;

  constructor(private readonly staffMemberService: StaffMemberService) {}

  ngOnInit(): void {
    this.staffMembers = [];
    this.isLoading = true;
    this.isError = false;
    this.staffMemberService.getStaffMembers({}).subscribe(
      (staffMembers) => {
        this.staffMembers = staffMembers;
        this.isLoading = false;
        this.isError = false;
      },
      () => {
        this.staffMembers = [];
        this.isLoading = false;
        this.isError = true;
      }
    );
  }

  public getAverageRobotPrice(staffMember) {
    const prices = staffMember.robots.map((robot) => robot.price);
    const sum = prices.reduce((total, current) => total + current, 0);

    return prices.length > 0 ? sum / prices.length : 0;
  }

  public getBrandsExpertiseCount(staffMember) {
    const brandIds = staffMember.robots.map((robot) => robot.brandId);

    return new Set(brandIds).size;
  }

  public getAverageRobotFeatures(staffMember) {
    const featureCounts = staffMember.robots.map((robot) => robot.features.length);
    const sum = featureCounts.reduce((total, current) => total + current, 0);

    return featureCounts.length > 0 ? Math.ceil(sum / featureCounts.length) : 0;
  }

  public getAverageRobotExpertsCount(staffMember) {
    const staffMemberCounts = staffMember.robots.map((robot) => robot.experts.length);
    const sum = staffMemberCounts.reduce((total, current) => total + current, 0);

    return staffMemberCounts.length > 0 ? Math.round(sum / staffMemberCounts.length) : 0;
  }
}
