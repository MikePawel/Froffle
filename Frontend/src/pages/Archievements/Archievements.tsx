import React from 'react'
import './Archievements.css'
import { Link } from 'react-router-dom'
import { Tooltip } from '@mui/material'
import Badge from '~/components/Badge/Badge'

const archievements = [{
  name: 'Example Archievement',
  description: 'Example Archievement Description',
  colors: {
    rim: '#FF9696',
    ribbon: ['#F84242', '#F23737'],
    gradient: ['#FF6161', '#FAEDED'],
  },
}, {
  name: 'Example Archievement 2',
  description: 'Example Archievement Description 2',
  colors: {
    rim: '#96FF96',
    ribbon: ['#42F842', '#37F237'],
    gradient: ['#61FF61', '#EDFAED'],
  },
}, {
  name: 'Example Archievement 3',
  description: 'Example Archievement Description 3',
  colors: {
    rim: '#9696FF',
    ribbon: ['#4242F8', '#3737F2'],
    gradient: ['#6161FF', '#EDEDFA'],
  },
}]

export default function Archievements() {
  return (
    <div className="archievements-page">
      Your Archievements
      <div className="archievements-container">
        {archievements.map((a, i) => <Tooltip title={a.description} key={i}><Badge className="archievement" id={i.toString()} colors={a.colors}>{a.name}</Badge></Tooltip>)}
      </div>
      <Link to="/"> Go Home </Link>
    </div>
  )
}
