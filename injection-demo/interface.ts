export interface HostManager {
  getHosts(appName: string): Promise<Array<string>>;
  getHostsByStatus(status: string);
}