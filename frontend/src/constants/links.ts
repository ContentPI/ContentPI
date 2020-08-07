export const STAGE_LINK = (u: any) => ({
  as: u ? `/dashboard/${u.appId}/${u.stage}` : '',
  href: '/dashboard/[appId]/[stage]'
})

export const MODEL_LINK = (u: any) => ({
  as: u ? `${STAGE_LINK(u).as}/schema/model/${u.model}` : '',
  href: `${STAGE_LINK(u).href}/[moduleName]/[section]/[model]`
})
