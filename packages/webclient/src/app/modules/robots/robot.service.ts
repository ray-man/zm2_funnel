import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RobotService {
  constructor(private readonly http: HttpClient) {}

  public getRobots(filters = {}) {
    return this.http.get<any>('/api/robots', { params: filters });
  }

  public getRobotById(id: number) {
    return this.http.get<any>(`/api/robots/${id}`);
  }

  public updateRobot(robotInfo) {
    const { id } = robotInfo;

    return this.http.put(`/api/robots/${id}`, robotInfo);
  }

  public getTypes() {
    return this.http.get('/api/info/types');
  }

  public getFeatures() {
    return this.http.get('/api/info/features');
  }

  public getBrands() {
    return this.http.get('/api/info/brands');
  }
}
