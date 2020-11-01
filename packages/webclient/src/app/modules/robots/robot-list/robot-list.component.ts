import { Component, OnInit } from "@angular/core";
import { RobotService } from "../robot.service";

@Component({
  selector: "app-robot-list",
  templateUrl: "./robot-list.component.html",
  styleUrls: ["./robot-list.component.scss"],
})
export class RobotListComponent implements OnInit {
  public robots = [];
  public isLoading = true;
  public isError = false;

  constructor(private readonly robotService: RobotService) {}

  ngOnInit(): void {
    this.robots = [];
    this.isLoading = true;
    this.isError = false;
    this.robotService.getRobots({}).subscribe(
      (robots) => {
        this.robots = robots;
        this.isLoading = false;
        this.isError = false;
      },
      () => {
        this.robots = [];
        this.isLoading = false;
        this.isError = true;
      }
    );
  }

  public getBadgeClass(robot) {
    switch (robot.type) {
      case "cleaning":
        return { "badge-secondary": true };
      case "kitchen":
        return { "badge-success": true };
      default:
        return { "badge-primary": true };
    }
  }
}
