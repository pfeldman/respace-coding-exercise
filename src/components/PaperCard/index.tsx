import { Typography, Grid, Paper } from '@mui/material'

interface Props {
  size: number
  title: string
  children: JSX.Element
  isMain?: boolean
}

export const PaperCard = ({ size, title, children, isMain }: Props) => {
  return (
    <Grid item xs={12} md={size}>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: isMain ? 'primary.light' : 'primary.main',
          padding: 2,
          color: 'primary.contrastText',
          height: isMain ? 'auto' : 200,
          minHeight: isMain ? 250 : 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography sx={{ fontSize: 14 }} color="primary.200" gutterBottom>
          {title}
        </Typography>
        {children}
      </Paper>
    </Grid>
  )
}
