import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);
  private readonly baseUrl = 'https://api.github.com';
  private readonly headers: Record<string, string>;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.headers = {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${this.configService.get<string>('GITHUB_TOKEN')}`,
    };
  }

  async getUserProfile(username: string) {
    const url = `${this.baseUrl}/users/${username}`;
    
    const { data } = await firstValueFrom(
      this.httpService.get(url, { headers: this.headers }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(`Failed to fetch GitHub profile: ${error.message}`);
          throw error;
        }),
      ),
    );
    
    return data;
  }

  async getRepositories(username: string) {
    const url = `${this.baseUrl}/users/${username}/repos`;
    
    const { data } = await firstValueFrom(
      this.httpService.get(url, { headers: this.headers }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(`Failed to fetch GitHub repositories: ${error.message}`);
          throw error;
        }),
      ),
    );
    
    return data;
  }
}
