export const STAGE_LINK = (u: any) => ({
  as: u ? `/dashboard/${u.appId}/${u.stage}` : '',
  href: '/dashboard/[appId]/[stage]'
})
