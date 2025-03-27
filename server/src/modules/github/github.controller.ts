import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('profile/:username')
  async getUserProfile(@Param('username') username: string) {
    return this.githubService.getUserProfile(username);
  }

  @Get('repos/:username')
  async getRepositories(@Param('username') username: string) {
    return this.githubService.getRepositories(username);
  }
}
