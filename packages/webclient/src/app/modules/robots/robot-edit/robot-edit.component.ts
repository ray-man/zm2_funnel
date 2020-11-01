import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { flatMap } from "rxjs/operators";
import { RobotService } from "../robot.service";

@Component({
  selector: "app-robot-edit",
  templateUrl: "./robot-edit.component.html",
  styleUrls: ["./robot-edit.component.scss"],
})
export class RobotEditComponent implements OnInit {
  public robot;

  public alerts = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly robotService: RobotService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(flatMap((params) => this.robotService.getRobotById(params.id)))
      .subscribe(
        (robot) => {
          this.robot = robot;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  public onFormSubmit() {
    this.alerts = [];

    this.robotService.updateRobot(this.robot).subscribe(
      (robot) => {
        this.robot = robot;
        this.alerts.push({ type: "success", message: "The robot was successfully updated." });
      },
      (error) => {
        console.error(error);

        this.alerts.push({
          type: "danger",
          message: "There was an error while updating the robot.",
        });
      }
    );
  }
}
