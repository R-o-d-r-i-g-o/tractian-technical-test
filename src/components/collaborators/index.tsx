"use client"

import { FC } from 'react'

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

type UserInfo = {
    name: string
    email: string
    photo: string | null
}

type Props = {
    maxShowing?: number
    alignRight?: boolean
    users: Array<UserInfo>
}

const Collaborators: FC<Props> = ({ users, maxShowing = 5, alignRight = false }) => (
  <AvatarGroup
    // Note: this part is related to reverse-row property.
    className={alignRight ? 'justify-end' : ''}
    max={maxShowing}
  >
    {users?.map(({ name, email, photo }, i) =>
      <Avatar
        sx={{ width: 32, height: 32 }}
        key={i}
        alt={name}
        src={photo ?? ""}
        title={email}
      >
        {name && name.length > 1 ? name[0] : ""}
      </Avatar>
    )}
  </AvatarGroup>
)

export default Collaborators;